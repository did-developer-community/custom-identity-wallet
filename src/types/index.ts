export interface Card {
  title: string;
  issuedBy: string;
  backgroundColor: string;
  textColor: string;
  logo: {
    uri: string;
    description: string;
  };
  description: string;
}

export interface RequiredToken {
  configuration: string;
  client_id: string;
  redirect_uri: string;
}

export interface RequiredPresentation {
  id: string;
  credentialType: string;
}

export interface RequiredAttestation {
  idTokens: RequiredToken[];
  presentations?: RequiredPresentation[];
}

export interface AcquiredIdToken {
  [id: string]: string;
}

export interface Manifest {
  display: {
    card: Card;
    contract: string;
  };
  input: {
    attestations: RequiredAttestation;
    credentialIssuer: string;
  };
}

export interface IdTokenConfiguration {
  authorization_endpoint: string;
  token_endpoint: string;
}

export interface PresentationDefinition {
  input_descriptors: {
    id: string;
    issuance: {
      manifest: string;
    }[];
  }[];
}

export interface VCRequest {
  prompt?: string;
  redirect_uri?: string;
  presentation_definition: PresentationDefinition;
  nonce?: string;
  state?: string;
  client_id?: string;
  iss?: string;
}
