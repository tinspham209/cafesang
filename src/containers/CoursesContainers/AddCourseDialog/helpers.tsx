import { ErrorService, Yup } from 'src/services';

export const initialAddCourseFormValue = {
  courseUrl: '',
  title: '',
  subTitle: '',
  type: '',
  content: '',
  thumbNail: '',
  dateCreated: null,
  eventDate: null,
  eventTime: null,
  eventLocation: '',
  hosts: null,
  courseLength: '',
  recordLink: '',
  recordThumbnail: '',
};

export const AddCourseFormSchema = Yup.object({
  courseUrl: Yup.string().required().typeError(ErrorService.MESSAGES.required),
  title: Yup.string().required().typeError(ErrorService.MESSAGES.required),
  subTitle: Yup.string().required().typeError(ErrorService.MESSAGES.required),
  type: Yup.string().required().typeError(ErrorService.MESSAGES.required),
  content: Yup.mixed().typeError(ErrorService.MESSAGES.required),
  thumbNail: Yup.mixed().typeError(ErrorService.MESSAGES.required),
  dateCreated: Yup.string().nullable(),
  eventDate: Yup.date().required().typeError(ErrorService.MESSAGES.required),
  eventTime: Yup.date().required().typeError(ErrorService.MESSAGES.required),
  eventLocation: Yup.string().required().typeError(ErrorService.MESSAGES.required),
  // hosts: Yup.array().required().typeError(ErrorService.MESSAGES.required),
  hosts: Yup.string().required().typeError(ErrorService.MESSAGES.required),
  courseLength: Yup.string().typeError(ErrorService.MESSAGES.required),
  recordLink: Yup.string().nullable().typeError(ErrorService.MESSAGES.required),
  recordThumbnail: Yup.string().nullable().typeError(ErrorService.MESSAGES.required),
});
