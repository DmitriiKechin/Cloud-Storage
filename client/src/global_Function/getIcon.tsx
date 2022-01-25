import { SvgDocument } from '../elements/svg/svgDocument';
import { SvgFile } from '../elements/svg/svgFile';
import { SvgFolder } from '../elements/svg/svgFolder';
import { SvgImage } from '../elements/svg/svgImage';

const fileTypes: { [key: string]: Array<string> } = {
  SvgDocument: [
    'doc',
    'docx',
    'txt',
    'pdf',
    'oxps',
    'pps',
    'ppsm',
    'ppsx',
    'ppt',
    'pptx',
    'rtf',
    'wps',
    'xls',
    'xlsx',
    'xps',
  ],
  SvgImage: ['jpeg', 'jpg', 'tiff', 'psd', 'bmp', 'gif', 'png', 'jp2'],
  SvgFolder: ['dir'],
};

const getIcon = (type: string): JSX.Element => {
  let svgType: string = '';

  Object.keys(fileTypes).forEach((key) => {
    if (fileTypes[key].includes(type.toLowerCase())) {
      svgType = key;
    }
  });

  let icon = <SvgFile />;

  switch (svgType) {
    case 'SvgDocument':
      icon = <SvgDocument />;
      break;
    case 'SvgImage':
      icon = <SvgImage />;
      break;
    case 'SvgFolder':
      icon = <SvgFolder />;
      break;
  }

  return icon;
};

export default getIcon;
