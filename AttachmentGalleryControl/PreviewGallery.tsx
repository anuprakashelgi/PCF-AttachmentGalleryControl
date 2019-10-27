import * as React from "react";
import {IAttachment} from "./interfaces/IAttachment";

interface IPreviewGalleryProps{
    notes: IAttachment[];
    thumbnailClick: Function;
}

export class PreviewGallery extends React.Component<IPreviewGalleryProps>{
    render(){
        const thumbnailsArr: IAttachment[] = this.props.notes;
        const thumbnailList = thumbnailsArr.map((item, index) => 
            <img key={item.id} 
            className="thumbnail" 
            src={"data:" + item.mimeType + ";base64, " + item.documentBody}
            onClick={(e) => this.props.thumbnailClick(e,index)}></img>
        );
        return <div className="thumbnailsList">
            {thumbnailList}
        </div>
    }
}
