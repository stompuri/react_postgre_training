import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import PortfolioStore from '../stores/PortfolioStore';
import '../../css/App.css';
import '../../css/portfolio.css';

function ListItem(props) {
  const item = props.value;
  return (
    <div className='container border itembox'>
      <div className='leftcell'>
        { item.imgUrl &&
          <img src='{item.imgUrl}' className='image' alt='{item.title}' />
        }
      </div>
      <div className='rightcell border'>
        <dl>
          <dt>({item.id}) {item.year}</dt>
          <dd>{item.title}</dd>
          { item.platform &&
            <dt>Platform:</dt>
          }
          { item.platform &&
            <dd>{item.platform}</dd>
          }
          { item.lang &&
            <dt>Language:</dt>
          }
          { item.lang &&
            <dd>{item.lang}</dd>
          }
          { item.loc &&
            <dt>Lines of code:</dt>
          }
          { item.loc &&
            <dd>{item.loc}</dd>
          }
          { item.link &&
            <dt>Web link:</dt>
          }
          { item.link &&
            <dd>{item.link}</dd>
          }
        </dl>
      </div>
    </div>
  );
}

function PortfolioList(props) {
  const items = props.items;
  const listItems = items.map((item) =>
    <ListItem key={item.id} value={item} />
  );

  return (
    <CSSTransitionGroup
      transitionName='list-item'
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={true}
      transitionEnterTimeout={500}
      transitionLeave={true}
      transitionLeaveTimeout={300}
      component='ul'
      className='list'>
      {listItems}
    </CSSTransitionGroup>
  );
}

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      portfolio_items: PortfolioStore.getAll(),
      loading: PortfolioStore.getLoading()
    };

    PortfolioStore.on('change', () => {
      this.setState({
        portfolio_items: PortfolioStore.getAll(),
        loading: PortfolioStore.getLoading(),
      });
    });
  }

  render() {
    const { portfolio_items, loading } = this.state;

    var dom = '';
    /*if (loading) {
      dom = <div className='loader'>Loading...</div>;
    } else {
      dom = <PortfolioList items={portfolio_items} />;
    }

    return (
      <div>
        { dom }
      </div>
    );
    */
    return <PortfolioList items={portfolio_items} />;
  }
}

PortfolioList.propTypes = {
  items: PropTypes.array
};

ListItem.propTypes = {
  value: PropTypes.object
};

export default Portfolio;
