import { Yup } from 'src/services';

export const EditOrderFormSchema = Yup.object({
  address: Yup.string(),
  cardType: Yup.string(),
  dateCreated: Yup.string(),
  fbLink: Yup.string(),
  name: Yup.string(),
  phoneNumber: Yup.string(),
  status: Yup.string(),
});
