import { StoredVC } from "../lib/repository/vc";
import {
  AcquiredIdToken,
  Card,
  Claim,
  Manifest,
  PresentationDefinition,
  RequiredAttestation,
  RequiredToken,
  VCRequest,
} from "../types";

export const card: Card = {
  title: "Verified Credential Expert",
  issuedBy: "Microsoft",
  backgroundColor: "#000000",
  textColor: "#ffffff",
  logo: {
    uri: "https://didcustomerplayground.blob.core.windows.net/public/VerifiedCredentialExpert_icon.png",
    description: "Verified Credential Expert Logo",
  },
  description: "Use your verified credential to prove to anyone that you know all about verifiable credentials.",
};

export const claim: Claim = {
  "vc.credentialSubject.firstName": {
    type: "string",
    label: "firstName",
  },
  "vc.credentialSubject.lastName": {
    type: "string",
    label: "lastName",
  },
  "vc.credentialSubject.displayName": {
    type: "string",
    label: "displayName",
  },
  "vc.credentialSubject.sponsorName": {
    type: "string",
    label: "sponsorName",
  },
};

export const requiredIdToken: RequiredToken = {
  configuration:
    "https://didplayground.b2clogin.com/didplayground.onmicrosoft.com/B2C_1_sisu/v2.0/.well-known/openid-configuration",
  client_id: "8d5b446e-22b2-4e01-bb2e-9070f6b20c90",
  redirect_uri: "vcclient://openid/",
};

export const requiredAttestations: RequiredAttestation = {
  idTokens: [requiredIdToken],
};

export const acquiredIdToken: AcquiredIdToken = {
  "https://didplayground.b2clogin.com/didplayground.onmicrosoft.com/B2C_1_sisu/v2.0/.well-known/openid-configuration":
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2MzM0MTkyNzksIm5iZiI6MTYzMzQxNTY3OSwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9kaWRwbGF5Z3JvdW5kLmIyY2xvZ2luLmNvbS85ZWNkZTYzZi04YTRlLTRmMDMtOTMxOS1mYzAxZjJiMTRiYWYvdjIuMC8iLCJzdWIiOiI0ODJjNWY5Ni04MmExLTRjZTMtOThmYi05MjllMTVjZGFlZTgiLCJhdWQiOiI4ZDViNDQ2ZS0yMmIyLTRlMDEtYmIyZS05MDcwZjZiMjBjOTAiLCJub25jZSI6IkRvR3UtZVZUekp2cFpqVWlJYTFNZVRQVHFzUDE4ZDhGZ1dWMFBQQ2FWNFkiLCJpYXQiOjE2MzM0MTU2NzksImF1dGhfdGltZSI6MTYzMzQxNTY3OCwiZ2l2ZW5fbmFtZSI6IlRhaWp1IiwiZmFtaWx5X25hbWUiOiJTYW7igIZhZ2kiLCJ0ZnAiOiJCMkNfMV9zaXN1In0.nFuN1ghlg7BKclzMx7xslvb245gVhvnYlwOgiAw8Lj4CMysnFEGjZy97yNNt0PuU6UFsahIbeoC7hdAP9TqfR4C9rpdfKYQKP1ytZPr5prEvrNDRG6AQZjSABSif45TVAk7Xm9xnE4l-6yshg3bzsyNwfLaKzk05FdTSgM3FUlWDxXOMC_Ewl0onrGx_b7AVw2r_HeEqhNXpD_tL7_n5zmWNZoMpU2zH2ryrHVqaa1hP6E-YhsdCqL1TwUjtQmX_toks0D3TKcf7d2ewWYPHQnsI0SdKp2ubdhjVYHVK7hA9d0sgIRfptJR4N8lsjADz3cMczGPbhlkAHgCH0VYoZg",
};

export const manifest: Manifest = {
  id: "sclvcdev02",
  display: {
    card,
    contract:
      "https://beta.did.msidentity.com/v1.0/3c32ed40-8a10-465b-8ba4-0b1e86882668/verifiableCredential/contracts/VerifiedCredentialExpert",
    claims: claim,
  },
  input: {
    credentialIssuer:
      "https://beta.did.msidentity.com/v1.0/3c32ed40-8a10-465b-8ba4-0b1e86882668/verifiableCredential/card/issue",
    attestations: requiredAttestations,
  },
};

export const presentation_definition: PresentationDefinition = {
  id: "fixture-vc",
  input_descriptors: [
    {
      id: "fixture-vc",
      issuance: [
        {
          manifest:
            "https://beta.did.msidentity.com/v1.0/3c32ed40-8a10-465b-8ba4-0b1e86882668/verifiableCredential/contracts/VerifiedCredentialExpert",
        },
      ],
    },
  ],
};

export const vcIssueRequest: VCRequest = {
  prompt: "create",
  claims: {
    vp_token: {
      presentation_definition,
    },
  },
};

export const vcVerifyRequest: VCRequest = {
  nonce: "XZtTG335Y3IZJA",
  state: "gBoOmiUnHC5Evs3Kd2wr5jvz1KPJYe4i",
  redirect_uri: "https://6ec4-39-110-214-139.ngrok.io/presentation-response",
  claims: {
    vp_token: {
      presentation_definition,
    },
  },
};

export const presentationVCIDs: string[] = ["fixture_vc"];

export const storedVC: StoredVC = {
  id: "0B9E8006-C5B3-4041-B65D-7F405CDB4F8D",
  format: "jwt_vc",
  type: ["VerifiedCredentialExpert"],
  vc: "",
  manifest: manifest,
  credentialSubject: {
    id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
    name: "Jane Doe",
    email: "sample.com",
  },
};
