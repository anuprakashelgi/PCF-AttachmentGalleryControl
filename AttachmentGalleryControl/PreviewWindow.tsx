import * as React from "react";
import { Icon } from 'office-ui-fabric-react/lib/Icon';

interface IPreviewWindowProps{
    source: string;
    arrowClick: Function;
}

export class PreviewWindow extends React.Component<IPreviewWindowProps> {

    render() {
        return <div className="preview-section">
            <img className="preview-img" src={this.props.source} alt="" />
            <a className="arrow-button preview-next" href="" onClick={(e) => this.props.arrowClick(e, 1)}>
                <Icon iconName="ChevronRight" />
            </a>
            <a className="arrow-button preview-prev" href="" onClick={(e) => this.props.arrowClick(e, -1)}>
                <Icon iconName="ChevronLeft" />
            </a>
        </div>
    }
}