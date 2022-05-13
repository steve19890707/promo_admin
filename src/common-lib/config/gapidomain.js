const host = window.location.host;
const protocol = window.location.protocol;
const domains = {
  dev: ``,
  qa: ``,
  int: ``,
  prod: ``,
};
export const fetchGapiDomain = ({
  getDev = "rd3-dev-",
  getQa = "rd3-qa-",
  getInt = "rd3-int-",
}) => {
  const local = !!~host.indexOf(":");
  const isDev = !!~host.indexOf(getDev);
  const isQa = !!~host.indexOf(getQa);
  const isInt = !!~host.indexOf(getInt);
  if (local || isDev) {
    return `${protocol}//${domains.dev}`;
  } else if (isQa) {
    return `${protocol}//${domains.qa}`;
  } else if (isInt) {
    return `${protocol}//${domains.int}`;
  } else return `${protocol}//${domains.prod}`;
};
