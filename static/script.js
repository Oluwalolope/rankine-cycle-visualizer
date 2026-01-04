async function calculate() {
    const data = {
        P_boiler: parseFloat(document.getElementById("P_boiler").value),
        P_condenser: parseFloat(document.getElementById("P_condenser").value),
        T_turbine_inlet: parseFloat(document.getElementById("T_turbine_inlet").value),
        pump_efficiency: parseFloat(document.getElementById("pump_efficiency").value),
        turbine_efficiency: parseFloat(document.getElementById("turbine_efficiency").value)
    };

    const res = await fetch("/calculate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    
    const result = await res.json();

    // Populate table
    const tbody = document.querySelector("#statesTable tbody");
    tbody.innerHTML = "";
    result.states.forEach(s => {
        const row = `<tr>
            <td>${s.point}</td>
            <td>${s.T.toFixed(2)}</td>
            <td>${s.P.toExponential(2)}</td>
            <td>${s.h.toExponential(2)}</td>
            <td>${s.s.toFixed(2)}</td>
            <td>${s.v.toExponential(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    // Plot charts
    Plotly.newPlot('tsChart', result.ts_chart.data);
    Plotly.newPlot('pvChart', result.pv_chart.data);
}
