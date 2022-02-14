const downloadViaForm = (urlDownload: string) => {
  console.log('urlDownload: ', urlDownload);
  const [action, parameters] = urlDownload.split('?');
  console.log('parameters: ', parameters);
  console.log('action: ', action);
  const form = document.createElement('form');

  form.name = 'formDownload';
  form.method = 'get';
  form.action = action;
  form.innerHTML = '';

  parameters.split('&').forEach((parameter) => {
    const [key, value] = parameter.split('=');
    form.innerHTML += `<input name="${key}" value="${decodeURIComponent(
      value
    )}">`;
  });
  form.innerHTML += '</input>';

  console.log('form.action: ', form.action);
  console.log('form.innerHTML: ', form.innerHTML);
  document.body.appendChild(form);
  form.submit();
  form.remove();

  // const form = document.createElement('form');

  // form.target = 'formDownload';
  // form.method = 'get';
  // form.action =
  //   'https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D';
  // form.innerHTML = '<input name="uid" value="0">';
  // form.innerHTML += `<input name="filename" value="${decodeURIComponent(
  //   '_DSC0363%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%20%282%29.jpg'
  // )}">`;
  // form.innerHTML += '<input name="disposition" value="attachment">';
  // form.innerHTML += `<input name="hash" value="${decodeURIComponent(
  //   'Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag%3D%3D%3A'
  // )}">`;
  // form.innerHTML += '<input name="limit" value="0">';
  // form.innerHTML += `<input name="content_type" value="${decodeURIComponent(
  //   'image%2Fjpeg'
  // )}">`;
  // form.innerHTML += '<input name="owner_uid" value="30468971">';
  // form.innerHTML += '<input name="fsize" value="13174611">';
  // form.innerHTML +=
  //   '<input name="hid" value="e6d4e99bf281029568be0a9f78d2ab0d">';
  // form.innerHTML += '<input name="media_type" value="image">';
  // form.innerHTML += '<input name="tknv" value="v2">';

  // console.log('form.action: ', form.action);
  // console.log('form.innerHTML: ', form.innerHTML);
  // //media_type=image&tknv=v2
  // //https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D?uid=0&filename=_DSC0363+копия+%282%29.jpg&disposition=attachment&hash=Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq%2FJ6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fjpeg&owner_uid=30468971&fsize=13174611&hid=e6d4e99bf281029568be0a9f78d2ab0d&media_type=image&tknv=v2
  // //https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D?uid=0&filename=_DSC0363%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%20%282%29.jpg&disposition=attachment&hash=Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fjpeg&owner_uid=30468971&fsize=13174611&hid=e6d4e99bf281029568be0a9f78d2ab0d&media_type=image&tknv=v2

  // //form.action:  https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D
  // //form.innerHTML:  <input name="uid" value="0"><input name="filename" value="_DSC0363 копия (2).jpg"><input name="disposition" value="attachment"><input name="hash" value="Kz1th1FhmTe2h51+TgndHIzQGRBQy45zB4QT82Xmk+cSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag==:"><input name="limit" value="0"><input name="content_type" value="image/jpeg"><input name="owner_uid" value="30468971"><input name="fsize" value="13174611"><input name="hid" value="e6d4e99bf281029568be0a9f78d2ab0d"><input name="media_type" value="image"><input name="tknv" value="v2">
  // document.body.appendChild(form);
  // form.submit();
};

export default downloadViaForm;
