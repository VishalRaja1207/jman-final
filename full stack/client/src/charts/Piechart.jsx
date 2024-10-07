import React from 'react';
import Chart from 'react-apexcharts';

const Piechart = ({ header, data }) => {
  // Chart options
  const categories = data.map(training => training.Designation);
  const pass_percentage = data.map(training => Number(training.Percentage));

  const options = {
    chart: {
      type: 'pie', // Change to 'pie' for a pie chart
      height: 350,
    },
    labels: categories, // Labels for pie slices
    title: {
      text: header, // Chart title
      align: 'center',
    },
    colors: ['#19105B', '#FF6196', '#71EAE1', '#3411A3', '#A16BDB', '#A6265E', '#16978E'], // Custom colors for slices
  };

  // Data for the chart
  const series = pass_percentage; // Values for each category

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="pie" height={350} />
    </div>
  );
};

export default Piechart;
