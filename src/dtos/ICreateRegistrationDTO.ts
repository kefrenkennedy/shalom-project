export interface ICreateRegistrationDTO {
  credential_name: string;
  event_source?: string;
  transportation_mode: string;
  accepted_the_terms: boolean;
  type: string;
  has_participated_previously: boolean;
}
