class PaginationTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayLength: 10,
        loading: false,
        page: 1,
        produtos : []
      };
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeLength = this.handleChangeLength.bind(this);
    }
    handleChangePage(dataKey) {
      this.setState({
        page: dataKey
      });
    }
    handleChangeLength(dataKey) {
      this.setState({
        page: 1,
        displayLength: dataKey
      });
    }
    getData() {
      const { displayLength, page, produtos } = this.state;
        
      return produtos.filter((v, i) => {
        const start = displayLength * (page - 1);
        const end = start + displayLength;
        return i >= start && i < end;
      });
    }
    render() {
      const data = this.getData();
      const { loading, displayLength, page } = this.state;
  
      return (
        <div>
          <Table height={420} data={data} loading={loading}>
            <Column width={50} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>
  
            <Column width={100} fixed>
              <HeaderCell>nome</HeaderCell>
              <Cell dataKey="nome" />
            </Column>
          </Table>
  
          <TablePagination
            lengthMenu={[
              {
                value: 10,
                label: 10
              },
              {
                value: 20,
                label: 20
              }
            ]}
            activePage={page}
            displayLength={displayLength}
            total={this.state.produtos.length}
            onChangePage={this.handleChangePage}
            onChangeLength={this.handleChangeLength}
          />
        </div>
      );
    }
  }