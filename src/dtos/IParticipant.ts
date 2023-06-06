export interface IParticipant {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string;
  birthdate: Date;
  document_number: string;
  document_type: string;
  guardian_name?: string;
  guardian_phone_number?: string;
  prayer_group?: string;
  community_type?: string;
  pcd_description?: string;
  allergy_description?: string;
  medication_use_description?: string;
  created_at?: Date;
}
