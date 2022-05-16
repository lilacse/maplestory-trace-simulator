import CssType from 'src/app/trace-simulator/enums/probabilities/CssType';
import SelectInputDataInterface from '../SelectInputDataInterface';

let CssData: SelectInputDataInterface[] = [
  {
    value: CssType.Css1p,
    selectValue: 'Css1p',
    displayString: 'Pure Clean Slate Scroll 1%',
  },
  {
    value: CssType.Css3p,
    selectValue: 'Css3p',
    displayString: 'Pure Clean Slate Scroll 3%',
  },
  {
    value: CssType.Css5p,
    selectValue: 'Css5p',
    displayString: 'Pure Clean Slate Scroll 5%',
  },
  {
    value: CssType.Css10p,
    selectValue: 'Css10p',
    displayString: 'Pure Clean Slate Scroll 10%',
  },
  {
    value: CssType.Css20p,
    selectValue: 'Css20p',
    displayString: 'Pure Clean Slate Scroll 20%',
  },
  {
    value: CssType.TraceCss5p,
    selectValue: 'TraceCss5p',
    displayString: 'Pure Clean Slate Scroll 5% (Spell Trace)',
  },
];

export default CssData;
