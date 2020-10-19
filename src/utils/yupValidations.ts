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
  address: Yup.string().required('Endereço obrigatório'),
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

export const schemaCreateUsers = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  responsible: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  creci: Yup.string().notRequired(),
  email: Yup.string().required('email obrigatório'),
  phone: Yup.string().required('telefone obrigatório'),
  secondary_phone: Yup.string().notRequired(),
});
