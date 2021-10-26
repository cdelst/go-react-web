import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";

const url = "https://us-west-2-1.aws.cloud2.influxdata.com";
const token = process.env.INFLUX_API_TOKEN;
const org = "casedelst@gmail.com";

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
const fluxQuery =
  'from(bucket:"location") |> range(start: -7d) |> filter(fn: (r) => r._measurement == "location") |> last()';

export function getLastRow() {
  console.log("*** QUERY ROWS ***");
  console.log(token);

  // Execute query and receive table metadata and rows.
  // https://v2.docs.influxdata.com/v2.0/reference/syntax/annotated-csv/
  queryApi.queryRows(fluxQuery, {
    next(row: string[], tableMeta: FluxTableMetaData) {
      const o = tableMeta.toObject(row);
      // console.log(JSON.stringify(o, null, 2))
      console.log(
        `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
      );
    },
    error(error: Error) {
      console.error(error);
      console.log("\nFinished ERROR");
    },
    complete() {
      console.log("\nFinished SUCCESS");
    },
  });
}
