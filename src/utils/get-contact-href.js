// @flow strict
const getContactHref = (name: string, contact: string) => {
  let href;

  switch (name) {
    case 'email':
      href = `mailto:${contact}`;
      break;

    default:
      href = contact;
      break;
  }

  return href;
};

export default getContactHref;
