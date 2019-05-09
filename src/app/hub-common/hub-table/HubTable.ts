export class Header {
  name: string;
  active: boolean;

  constructor(name: string, active: boolean) {
    this.name = name;
    this.active = active;
  }
}

export class HubTable {
  public header: Header[];
  public activeData: any[][];

  private data: any[][];

  constructor(originalData: any[][]) {
    // create the header
    this.header = originalData[0].map(
      (headerElement: string) => new Header(headerElement, false)
    );

    // remove the header with a shift
    originalData.shift();
    // assign the rest of the data to the table data
    this.data = originalData;
  }

  /* change the active status of the column with the provided name */
  public changeColumnActivity(name: string, status: boolean) {
    this.header.find(h => h.name === name).active = status;
    this.refreshActiveData();
  }

  /* refresh the active data based on the currently active headers */
  public refreshActiveData() {
    this.activeData = this.data.map((row: any[]) =>
      row.filter((element: any, index: number) => this.header[index].active)
    );
  }
}
