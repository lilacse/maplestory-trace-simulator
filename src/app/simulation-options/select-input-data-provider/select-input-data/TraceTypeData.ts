import TraceType from 'src/app/trace-simulator/enums/probabilities/TraceType';
import SelectInputDataInterface from '../SelectInputDataInterface';

let TraceData: SelectInputDataInterface[] = [
  {
    value: TraceType.Trace100p,
    selectValue: 'Trace100p',
    displayString: '100% Success Rate Enhancement',
  },
  {
    value: TraceType.Trace70p,
    selectValue: 'Trace70p',
    displayString: '70% Success Rate Enhancement',
  },
  {
    value: TraceType.Trace30p,
    selectValue: 'Trace30p',
    displayString: '30% Success Rate Enhancement',
  },
  {
    value: TraceType.Trace15p,
    selectValue: 'Trace15p',
    displayString: '15% Success Rate Enhancement',
  },
];

export default TraceData;
