export interface ICreateRegistrationDTO {
  user_id: string;
  event_id: string;
  full_name: string;
  phone_number: string;
  age: number;
  document_number: string;
  document_type: string;
  guardian_name?: string;
  guardian_phone_number?: string;
  prayer_group?: string;
  event_source?: string;
  community_type?: string;
  pcd_description?: string;
  allergy_description?: string;
  transportation_mode: string;
  accepted_the_terms: boolean;
}
