const downloadViaForm = (urlDownload: string) => {
  console.log('urlDownload: ', urlDownload);
  const [action, parameters] = urlDownload.split('?');
  console.log('parameters: ', parameters);
  console.log('action: ', action);
  const form = document.createElement('form');

  form.target = 'formDownload';
  form.method = 'get';
  form.action = action;
  form.innerHTML = '';

  parameters.split('&').forEach((parameter) => {
    const [key, value] = parameter.split('=');
    form.innerHTML += `<input name="${key}" value="${decodeURIComponent(
      value
    )}">`;
  });

  console.log('form.action: ', form.action);
  console.log('form.innerHTML: ', form.innerHTML);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};

export default downloadViaForm;
