const boton = document.querySelector(".boton");
const select = document.querySelector("#mony");
const result = document.querySelector("h3");
const apiUrl = "https://mindicador.cl/api/";
const ctx = document.getElementById("myChart");
let chart;

boton.addEventListener("click", () => {
  input = document.querySelector("#numero").value;
  console.log(input);
});

boton.addEventListener("click", async () => {
  try {
    const info = await fetch(apiUrl + select.value);
    const valores = await info.json();
    console.log(valores);
    mostrarInfo(valores);
    mostraMonto(valores);
  } catch (error) {
    console.log("Hay un erro al traer la info" + error);
  }
});

function mostraMonto(data) {
  let arrayMonto = [];
  for (i = 0; i < 1; i++) {
    arrayMonto.push(data.serie[i]);
  }
  montoTotal(arrayMonto);
}

function montoTotal(data) {
  html = "";
  input = document.querySelector("#numero").value;
  const monto = data.map((element) => {
    return element.valor;
  });
  total = input / monto;
  console.log("monto:" + monto);
  console.log("total:" + total);
  result.innerHTML = html += `
    <h3>Resultado :${total}</h3>`;
}

function mostrarInfo(data) {
  let arrayInfo = [];
  for (i = 0; i < 10; i++) {
    arrayInfo.push(data.serie[i]);
  }
  renderCanvas(arrayInfo);

  console.log(arrayInfo);
}

function renderCanvas(data) {
  if (chart) {
    chart.destroy();
  }
  const labels = data.map((element) => {
    return element.fecha.slice(0, 10);
  });
  labels.reverse();

  const datos = data.map((element) => {
    return element.valor;
  });

  console.log("valor:" + datos);
  datos.reverse();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${select.value}`,
          data: datos,
          borderWidth: 1,
        },
      ],
    },
  });
}