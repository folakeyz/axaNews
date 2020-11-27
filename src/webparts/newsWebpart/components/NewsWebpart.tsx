import * as React from 'react';
import styles from './NewsWebpart.module.scss';
import { INewsWebpartProps } from './INewsWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jQuery from "jquery";
import { ClassNews } from './ClassNews';
import { INews } from './INews';
import { Web } from "sp-pnp-js";

export default class NewsWebpart extends React.Component<INewsWebpartProps, any> {
  public constructor(props:INewsWebpartProps,any)
  {
      
      super(props);
      this.state={
          items:[]
      }
      }
  public render(): React.ReactElement<INewsWebpartProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <div className={ styles.News }>
            <div className={ styles.headline }>
                <div className={ styles.grid }>
                    <div className={ styles.hcard }>
                       <h1>Departmental News</h1>
                    </div> 
                    <div className={ styles.hcard }>
                      <a href="https://axamansard.sharepoint.com/Newsfeed.aspx">View All</a>
                    </div> 
                </div> 
            </div>

        <div className={ styles.grid }>
        {
        this.state.items.map(function(item:INews){
    return(

          <div className={ styles.card }>
              <div className={ styles.grids }>
                   <div className={ styles.cards }>
                      <img src={item.BannerImageUrl['Url']} alt="Departmental News" />
                    </div>
                  <div className={ styles.cards }>
                    <h3>{item.Title}</h3>
                    <p>{item.Description}</p>
                    <a>{item.Created}</a> <br/><br/>
                    <a href={item.Link} className={styles.btn}>Read More</a>
                  </div>
                </div>
            </div>
 )

    
})

}
        </div>
      </div>
    );
  }
  public componentDidMount()
  {
      
      // debugger;
      this._NewsList();
  }
  private _NewsList():void
  {
  
   
  let web = new Web(this.props.context.pageContext.web.absoluteUrl);  
  web.lists.getByTitle(`Site Pages`).items.get().then
      ((response)=>{
        console.log(response)
          let NewsCollection=response.map(item=> new ClassNews(item)).reverse();
          let NewsCard = NewsCollection.slice(0, 6)
          this.setState({items:NewsCard});
      }
  
      )
  }
  }


