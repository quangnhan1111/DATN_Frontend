<script>
import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  name: "AreaChart",
  props: {
    // data: Array,
  },
  async created() {

  },
  data() {
    return {
      sale: [0, 0, 174, 15, 66, 0, 15, 0, 0, 0, 0, 14,0],
      gradient: null,
      gradient2: null,
    };
  },
  async mounted() {
    let token = {
      headers: {'Authorization': `token ${localStorage.getItem("token")}`}
    }
    let data = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]

    await axios.get('saleFigure/get-sale-figure-by-month', token)
        .then(response => {
          response.data.data[0].forEach(function(item) {
            data[parseInt(item.Month) -1] += item.total_sale
          })
          this.sale = data.slice();
        })
        .catch(error => {
          console.log(error)
        })


    this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.renderChart(
        {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: "Data One",
              borderColor: "#FC2525",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "white",
              backgroundColor: this.gradient,
              data: this.sale,
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
