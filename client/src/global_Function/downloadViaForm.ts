const downloadViaForm = (urlDownload: string) => {
  const url = new URL(urlDownload);
  const form = document.createElement('form');
  form.target = 'formDownload';
  form.method = 'get';
  form.action = url.origin + url.pathname;
  form.innerHTML = '';

  [...url.searchParams.keys()].forEach((parametr) => {
    form.innerHTML += `<input name="${parametr}" value="${url.searchParams.get(
      parametr
    )}">`;
  });

  document.body.appendChild(form);
  form.submit();
  //  form.remove();
};

export default downloadViaForm;
