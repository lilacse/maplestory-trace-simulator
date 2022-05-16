import InnoType from 'src/app/trace-simulator/enums/probabilities/InnoType';
import SelectInputDataInterface from '../SelectInputDataInterface';

let InnoData: SelectInputDataInterface[] = [
  {
    value: InnoType.Inno20p,
    selectValue: 'Inno20p',
    displayString: 'Innocence Scroll 20%',
  },
  {
    value: InnoType.Inno40p,
    selectValue: 'Inno40p',
    displayString: 'Innocence Scroll 40%',
  },
  {
    value: InnoType.Inno50p,
    selectValue: 'Inno50p',
    displayString: 'Innocence Scroll 50%',
  },
  {
    value: InnoType.Inno60p,
    selectValue: 'Inno60p',
    displayString: 'Innocence Scroll 60%',
  },
  {
    value: InnoType.Inno70p,
    selectValue: 'Inno70p',
    displayString: 'Innocence Scroll 70%',
  },
  {
    value: InnoType.TraceInno30p,
    selectValue: 'TraceInno30p',
    displayString: 'Innocence Scroll 30% (Spell Trace)',
  },
  {
    value: InnoType.TraceArkInno30p,
    selectValue: 'TraceArkInno30p',
    displayString: 'Ark Innocence Scroll 30% (Spell Trace)',
  },
];

export default InnoData;
