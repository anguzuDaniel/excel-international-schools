export default function Fees() {
  return (
    <div className="container mx-auto my-12">
      <h1>Fees Structure</h1>
      {/* Render fees table */}
      <table className="table-auto">
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tuition and Boarding S1</td>
            <td>1,500,000 /=</td>
          </tr>
          {/* More rows */}
        </tbody>
      </table>
    </div>
  );
}
