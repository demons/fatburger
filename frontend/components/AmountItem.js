function AmountItem({ amount }) {
  const { energy, protein, fat, carb } = amount;

  return (
    <div className="amount-item">
      <div className="field">Калории: {energy}</div>
      <div className="field">Белки: {protein}</div>
      <div className="field">Жиры: {fat}</div>
      <div className="field">Углеводы: {carb}</div>
    </div>
  );
}

export default AmountItem;
