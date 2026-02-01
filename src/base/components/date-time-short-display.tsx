function TwoDigitNumberWithSubduedLeadingZero({ num }: { num: number }) {
  if (num > 9) {
    return <>{`${num}`}</>;
  }
  // <span className="text-gray-500">0</span>
  return <>&nbsp;{`${num}`}</>;
}

function twoDigitNumber(num: number) {
  if (num < 9) {
    return `0${num}`;
  }
  return `${num}`;
}

export function DisplayShortDate({ date }: { date: Date }) {
  return (
    <span className="font-mono">
      <TwoDigitNumberWithSubduedLeadingZero num={date.getMonth() + 1} />
      <span className="text-gray-500">{'\u29F8'}</span>
      <TwoDigitNumberWithSubduedLeadingZero num={date.getDate()} />
    </span>
  );
}

export function DisplayShortIsoDate({ isoDate }: { isoDate: string }) {
  return (
    <span className="font-mono">
      <TwoDigitNumberWithSubduedLeadingZero num={Number.parseInt(isoDate.substring(5, 7), 10)} />
      <span className="text-gray-500">{'\u29F8'}</span>
      <TwoDigitNumberWithSubduedLeadingZero num={Number.parseInt(isoDate.substring(8, 10), 10)} />
    </span>
  );
}

export function DisplayShortTime({ date }: { date: Date }) {
  return (
    <span className="font-mono">
      <TwoDigitNumberWithSubduedLeadingZero num={date.getHours()} />
      <span className="text-gray-500">:</span>
      {twoDigitNumber(date.getMinutes())}
    </span>
  );
}
