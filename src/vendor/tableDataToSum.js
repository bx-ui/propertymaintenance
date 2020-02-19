export default {
  install(Vue) {
    Vue.prototype.getSummaries = function (param) {
      const {
        columns,
        data
      } = param;
      const sums = [];
      console.log(columns);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        if (column.label !== "总额") return;

        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return ((prev * 100 + curr * 100) / 100).toFixed(2);
            } else {
              return prev; 
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
    Vue.prototype.getSumSaveForTwo = function (a, b) { //求和并保留两位小数
      let sums = parseFloat((a * 100 * (b * 100) / 10000).toFixed(2));
      return sums;
    }
  }
}
