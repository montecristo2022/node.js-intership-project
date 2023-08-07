import * as yup from 'yup';

export const noteSchema = yup.object().shape({
  text: yup.string().required(),
  archived: yup.boolean().required(),
  category: yup.string().oneOf(['Task', 'Random Thought', 'Idea']).required(),
});
