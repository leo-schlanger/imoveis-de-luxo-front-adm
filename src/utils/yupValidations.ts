import * as Yup from 'yup';

export const schemaSignIn = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

export const schemaCreateAdvertisement = Yup.object().shape({
  title: Yup.string().required('Titulo obrigatório'),
  description: Yup.string(),
  type: Yup.string().required('Tipo de anuncio obrigatório'),
  type_property: Yup.string().required('Titulo de propriedade obrigatório'),
  // address_visible: Yup.boolean().required('Endereço obrigatório'),
  value: Yup.number().required('Valor obrigatório'),
  country: Yup.string().required('Pais obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  postal_code: Yup.string().required('Código postal obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  street: Yup.string().required('Endereço obrigatório'),
  number: Yup.string(),
  complement: Yup.string(),
});

export const schemaCreatePlan = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  description: Yup.string().notRequired(),
  quantity_properties: Yup.number().required('Quantidade obrigatória'),
  quantity_photos: Yup.number().required('Quantidade obrigatória'),
  quantity_videos: Yup.number().required('Quantidade obrigatória'),
  value: Yup.number().required('Valor obrigatório'),
});

export const schemaUpdatePlan = Yup.object().shape({
  name: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  quantity_properties: Yup.number().notRequired(),
  quantity_photos: Yup.number().notRequired(),
  quantity_videos: Yup.number().notRequired(),
  value: Yup.number().notRequired(),
});

export const schemaCreateUsers = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  responsible: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  creci: Yup.string().notRequired(),
  email: Yup.string().required('email obrigatório'),
  phone: Yup.string().required('telefone obrigatório'),
  secondary_phone: Yup.string().notRequired(),
});

export const schemaUpdateUser = Yup.object().shape({
  name: Yup.string().notRequired(),
  responsible: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  creci: Yup.string().notRequired(),
  email: Yup.string().notRequired(),
  phone: Yup.string().notRequired(),
  secondary_phone: Yup.string().notRequired(),
  country: Yup.string().notRequired(),
  state: Yup.string().notRequired(),
  postal_code: Yup.string().notRequired(),
  neighborhood: Yup.string().notRequired(),
  sub_neighborhood: Yup.string().notRequired(),
  street: Yup.string().notRequired(),
  number: Yup.string().notRequired(),
  complement: Yup.string().notRequired(),
  // description: Yup.string().notRequired(),
});
