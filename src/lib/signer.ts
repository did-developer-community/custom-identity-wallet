import ION from "@decentralized-identity/ion-tools";
import { calculateThumbprint, JWK } from "jose/jwk/thumbprint";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { DID_ION_KEY_ID, SIOP_VALIDITY_IN_MINUTES } from "../configs/constants";

export interface KeyPair {
  publicJwk: JWK;
  privateJwk: JWK;
}

export interface VPOptions {
  vcs: string[];
  verifierDID: string;
  nonce?: string;
}

export interface SiopOptions {
  aud: string;
  contract?: string;
  attestations?: any;
  recipient?: string;
  vc?: string;
  nonce?: string;
  state?: string;
  nbf?: number;
  presentation_submission?: {
    descriptor_map?: [
      {
        id?: string;
        path?: string;
        encoding?: string;
        format?: string;
      }?
    ];
  };
  pin?: string;
}

export interface SiopV2Options {
  aud: string;
  nonce?: string;
  state?: string;
  nbf?: number;
  _vp_token?: {
    presentation_submission?: {
      id?: string;
      definition_id?: string;
      descriptor_map?: {
        path?: string;
        id?: string;
        format?: string;
        path_nested?: {
          id?: string;
          format?: string;
          path?: string;
        };
      }[];
    };
  };
}

export class Signer {
  did: string;
  keyPair: KeyPair;

  init = async (keyPair: KeyPair): Promise<void> => {
    this.keyPair = keyPair;
    const did = new ION.DID({
      ops: [
        {
          operation: "create",
          content: {
            publicKeys: [
              {
                id: DID_ION_KEY_ID,
                type: "EcdsaSecp256k1VerificationKey2019",
                publicKeyJwk: keyPair.publicJwk,
                purposes: ["authentication"],
              },
            ],
          },
          recovery: keyPair,
          update: keyPair,
        },
      ],
    });
    this.did = await did.getURI();
  };

  siop = async (options: SiopOptions): Promise<string> => {
    return await ION.signJws({
      header: {
        typ: "JWT",
        alg: "ES256K",
        kid: `${this.did}#${DID_ION_KEY_ID}`,
      },
      payload: {
        iat: moment().unix(),
        exp: moment().add(SIOP_VALIDITY_IN_MINUTES, "minutes").unix(),
        did: this.did,
        jti: uuidv4().toUpperCase(),
        sub: await calculateThumbprint(this.keyPair.publicJwk),
        sub_jwk: {
          ...this.keyPair.publicJwk,
          key_ops: ["verify"],
          use: "sig",
          alg: "ES256K",
          kid: `${DID_ION_KEY_ID}`,
        },
        iss: "https://self-issued.me",
        ...options,
      },
      privateJwk: this.keyPair.privateJwk,
    });
  };

  siopV2 = async (options: SiopV2Options): Promise<string> => {
    return await ION.signJws({
      header: {
        typ: "JWT",
        alg: "ES256K",
        kid: `${this.did}#${DID_ION_KEY_ID}`,
      },
      payload: {
        iat: moment().unix(),
        exp: moment().add(SIOP_VALIDITY_IN_MINUTES, "minutes").unix(),
        sub: this.did,
        iss: "https://self-issued.me/v2/openid-vc",
        ...options,
      },
      privateJwk: this.keyPair.privateJwk,
    });
  };

  createVP = async (options: VPOptions): Promise<string> => {
    return await ION.signJws({
      header: {
        typ: "JWT",
        alg: "ES256K",
        kid: `${this.did}#${DID_ION_KEY_ID}`,
      },
      payload: {
        iat: moment().unix(),
        exp: moment().add(SIOP_VALIDITY_IN_MINUTES, "minutes").unix(),
        nbf: moment().unix(),
        jti: uuidv4().toUpperCase(),
        vp: {
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiablePresentation"],
          verifiableCredential: options.vcs,
        },
        iss: this.did,
        aud: options.verifierDID,
        nonce: options.nonce,
      },
      privateJwk: this.keyPair.privateJwk,
    });
  };
}
