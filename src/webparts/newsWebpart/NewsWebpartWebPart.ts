import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NewsWebpartWebPartStrings';
import NewsWebpart from './components/NewsWebpart';
import { INewsWebpartProps } from './components/INewsWebpartProps';

export interface INewsWebpartWebPartProps {
  description: string;
  Title: string;
  Description: string;
  Link: string;
  BannerImageUrl: string;
  Created: string;
}

export default class NewsWebpartWebPart extends BaseClientSideWebPart<INewsWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INewsWebpartProps> = React.createElement(
      NewsWebpart,
      {
        description: this.properties.description,
        Title: this.properties.Title,
        Description:  this.properties.Description,
        Link:  this.properties.Link,
        BannerImageUrl:  this.properties.BannerImageUrl,
        Created:  this.properties.Created,
        context: this.context 
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
