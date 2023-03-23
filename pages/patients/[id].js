function Patient({ patient, id }) {
  return (
    <>
      <h1>Patient {id}</h1>
      <div className="flex gap-2">
        <div key={patient.id} className="p-4 bg-lightest rounded-lg shadow-lg">
          <h2>{patient.firstname}</h2>
          <h2>{patient.lastname}</h2>
          <h2>{patient.age} ans</h2>
          <h2>{patient.matrimony} </h2>
          <h2>{patient.tel}</h2>
        </div>
      </div>
    </>
  );
}

export default Patient;

export async function getServerSideProps(context) {
  const { params, req } = context;
  console.log(req.headers.cookie);
  const { id } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/patients/${id}`
  );
  const data = await response.json();

  return { props: { patient: data, id } };
}
