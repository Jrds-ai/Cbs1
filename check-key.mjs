async function check() {
  const res = await fetch('http://localhost:3000/api/check-key');
  const data = await res.json();
  console.log(data);
}
check();
