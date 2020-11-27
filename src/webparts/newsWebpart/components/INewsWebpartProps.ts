import { WebPartContext } from "@microsoft/sp-webpart-base"; 
export interface INewsWebpartProps {
  description: string;
  Title: string;
  Description: string;
  Link: string;
  BannerImageUrl: string;
  Created: string;
  context:WebPartContext; 
}
