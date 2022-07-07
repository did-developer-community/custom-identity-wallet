import axios from "axios";
import crypto from "crypto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EC = require("elliptic").ec;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const canonicalize = require("canonicalize");
const ec = new EC("secp256k1");

const formats = [".png", ".jpeg", ".jpg"];
export const getImageUrlInText = (text: string): string | undefined => {
  const urlExpression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  const urlRegex = new RegExp(urlExpression);
  const matchedUrl = text.match(urlRegex);
  if (!matchedUrl) return undefined;
  const url = text;
  const matchedFormats = formats.filter((format) => {
    const reg = new RegExp(format);
    return url.match(reg);
  });
  if (!matchedFormats.length) return undefined;
  return url;
};

export const constants = {
  did: {
    methodName: "ion",
    publicKeyType: "EcdsaSecp256k1VerificationKey2019",
    keyId: "signingKey",
  },
  jwt: {
    header: {
      alg: "ES256K",
    },
    payload: {
      iss: "https://self-issued.me",
      iat: 0,
      exp: 9999999999,
    },
  },
  jwk: {
    kty: "EC",
    crv: "secp256k1",
  },
  ecdh: {
    crv: "secp256k1",
  },
  hash: {
    type: "sha256",
    fc: 0x12,
  },
  pem: {
    pre: "-----BEGIN EC PRIVATE KEY-----\n",
    post: "\n-----END EC PRIVATE KEY-----",
  },
  asn1: {
    pre: "302e0201010420",
    post: "a00706052b8104000a",
  },
};

export const base64url = {
  encode: (unencoded) => {
    return Buffer.from(unencoded).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  },
  decode: (encoded) => {
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (encoded.length % 4) {
      encoded += "=";
    }
    return Buffer.from(encoded, "base64").toString("utf8");
  },

  decodeToBuffer: (encoded) => {
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (encoded.length % 4) {
      encoded += "=";
    }
    return Buffer.from(encoded, "base64");
  },
};

interface DIDDocument {
  verificationMethod: [
    {
      publicKeyJwk: {
        x: string;
        y: string;
      };
    }
  ];
}

export const jwt = {
  decode: (jwt) => {
    const payload = JSON.parse(base64url.decode(jwt.split(".")[1]));
    return payload;
  },

  //FIXME: 署名、検証周りがいろんなモジュールを使ったり使わなかったりして荒れているので方向性を揃えたい
  verify: async (jwt) => {
    const splittedJwt = jwt.split(".");
    const header = JSON.parse(base64url.decode(splittedJwt[0]));
    const payload = JSON.parse(base64url.decode(splittedJwt[1]));
    const signature = base64url.decodeToBuffer(splittedJwt[2]);

    const message = `${splittedJwt[0]}.${splittedJwt[1]}`;
    const did = header.kid;

    const didDocumentResponse = await axios
      .get<DIDDocument>(`https://beta.discover.did.microsoft.com/1.0/identifiers/${did}`)
      .then((res) => res.data);

    //FIXME: 複数public keyがある場合にループしてKIDを元に取得
    const publicKeyJwk = didDocumentResponse.verificationMethod[0].publicKeyJwk;
    console.log(publicKeyJwk);

    const pub = {
      x: base64url.decodeToBuffer(publicKeyJwk.x),
      y: base64url.decodeToBuffer(publicKeyJwk.y),
    };
    const key = ec.keyFromPublic(pub);
    const signatureInRS = {
      r: signature.slice(0, 32),
      s: signature.slice(32, 64),
    };
    const digest = crypto.createHash(constants.hash.type).update(message).digest();
    const verified = key.verify(digest, signatureInRS);
    if (!verified) {
      throw new Error("signature not verified");
    }
    return payload;
  },
};

export const multihash = (data) => {
  const digest = crypto.createHash(constants.hash.type).update(data).digest();
  const prefix = Buffer.from([constants.hash.fc, digest.length]);
  return Buffer.concat([prefix, digest]);
};

export const hashAsNonMultihashBuffer = (data) => {
  const hash = crypto.createHash("sha256").update(data).digest();
  return hash;
};

export const generateJti = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const generatePrivateKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateHash = (type: string, data: string) => {
  return base64url.encode(crypto.createHash(type).update(data).digest());
};

export const generateState = () => {
  return crypto.randomBytes(4).toString("hex");
};

export const generateVerifier = () => {
  return crypto.randomBytes(44).toString("hex");
};

export const privateKeyToPem = (privateKey) => {
  const asn1 = `${constants.asn1.pre}${privateKey}${constants.asn1.post}`;
  const asn1Base64 = Buffer.from(asn1, "hex").toString("base64");
  const pem = `${constants.pem.pre}${asn1Base64}${constants.pem.post}`;
  return pem;
};

export const privateKeyToJwk = (privateKey) => {
  const privateKeyBuffer = Buffer.from(privateKey, "hex");
  const ecdh = crypto.createECDH(constants.ecdh.crv);
  ecdh.setPrivateKey(privateKeyBuffer);
  const pub = ecdh.getPublicKey();
  const publicKeyJwk = {
    crv: constants.jwk.crv,
    kty: constants.jwk.kty,
    x: base64url.encode(pub.slice(1, 32 + 1)),
    y: base64url.encode(pub.slice(32 + 1)),
  };
  const privateKeyJwk = {
    d: base64url.encode(privateKeyBuffer),
    ...publicKeyJwk,
  };
  return { publicKeyJwk, privateKeyJwk };
};

export class JsonCanonicalizer {
  /**
   * Canonicalizes the given content as a UTF8 buffer.
   */
  public static canonicalizeAsBuffer(content): Buffer {
    const canonicalizedString: string = canonicalize(content);
    const contentBuffer = Buffer.from(canonicalizedString);
    return contentBuffer;
  }
}

export const publicKeyJwkToIonDid = (publicKeyJwk) => {
  const id = constants.did.keyId;
  const contentBuffer = JsonCanonicalizer.canonicalizeAsBuffer(publicKeyJwk);
  const intermediateHashBuffer = hashAsNonMultihashBuffer(contentBuffer);
  const multihashBuffer = multihash(intermediateHashBuffer);
  const commitment_hash = base64url.encode(multihashBuffer);

  const patches = [
    {
      action: "replace",
      document: {
        publicKeys: [
          {
            id,
            type: constants.did.publicKeyType,
            publicKeyJwk: publicKeyJwk,
            purposes: ["authentication", "assertionMethod"],
          },
        ],
      },
    },
  ];
  const delta = {
    updateCommitment: commitment_hash,
    patches,
  };
  const canonical_delta = JsonCanonicalizer.canonicalizeAsBuffer({
    updateCommitment: commitment_hash,
    patches,
  });
  const deltaHash = base64url.encode(multihash(canonical_delta));

  const suffixData = {
    deltaHash,
    recoveryCommitment: commitment_hash,
  };
  const canonicalizedStringBuffer = JsonCanonicalizer.canonicalizeAsBuffer(suffixData);
  const multihashed = multihash(canonicalizedStringBuffer);
  const didUniqueSuffix = base64url.encode(multihashed);
  const shortFormDid = `did:${constants.did.methodName}:${didUniqueSuffix}`;
  const initialState = {
    suffixData,
    delta,
  };
  const canonicalizedInitialStateBuffer = JsonCanonicalizer.canonicalizeAsBuffer(initialState);
  const encodedCanonicalizedInitialStateString = base64url.encode(canonicalizedInitialStateBuffer);
  const longFormDid = `${shortFormDid}:${encodedCanonicalizedInitialStateString}`;
  return longFormDid;
};

export class Wallet {
  privateKey;
  publicKeyJwk;
  privateKeyJwk;
  did;
  constructor(privateKey?) {
    this.privateKey = privateKey ? privateKey : generatePrivateKey();
    const { publicKeyJwk, privateKeyJwk } = privateKeyToJwk(this.privateKey);
    this.publicKeyJwk = publicKeyJwk;
    this.privateKeyJwk = privateKeyJwk;
    this.did = publicKeyJwkToIonDid(publicKeyJwk);
  }

  siop = (options?) => {
    const jti = generateJti();
    const header = {
      alg: constants.jwt.header.alg,
      kid: `${this.did}#${constants.did.keyId}`,
    };
    const digest = crypto.createHash("sha256").update(JSON.stringify(this.publicKeyJwk)).digest();
    const sub = base64url.encode(digest);
    const payload = {
      iss: constants.jwt.payload.iss,
      iat: constants.jwt.payload.iat,
      exp: constants.jwt.payload.exp,
      did: this.did,
      jti,
      sub,
      sub_jwk: this.publicKeyJwk,
      ...options,
    };
    return this.sign(header, payload);
  };

  createExchangePayload = (vc, exchangeId, pairwiseDid) => {
    const jti = generateJti();
    const header = {
      alg: constants.jwt.header.alg,
      kid: `${this.did}#${constants.did.keyId}`,
      typ: "JWT",
    };

    const payload = {
      aud: exchangeId,
      iss: "https://self-issued.me",
      iat: constants.jwt.payload.iat,
      exp: constants.jwt.payload.exp,
      did: this.did,
      jti,
      sub_jwk: this.publicKeyJwk,
      vc,
      recipient: pairwiseDid,
    };
    return this.sign(header, payload);
  };

  sign = (header, payload) => {
    const pem = privateKeyToPem(this.privateKey);
    const encodedHeader = base64url.encode(JSON.stringify(header));
    const encodedPayload = base64url.encode(JSON.stringify(payload));
    const message = `${encodedHeader}.${encodedPayload}`;
    const signature = base64url.encode(crypto.createSign(constants.hash.type).update(message).sign(pem));
    const result = `${encodedHeader}.${encodedPayload}.${signature}`;
    return result;
  };
}
