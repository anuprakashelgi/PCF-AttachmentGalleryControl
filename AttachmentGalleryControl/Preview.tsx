import * as React from "react";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { PreviewWindow } from "./PreviewWindow";
import { PreviewGallery } from "./PreviewGallery";
import { IAttachment } from "./interfaces/IAttachment";

initializeIcons();

interface IPreviewProps {
    notes: IAttachment[];
    loading: boolean;
}

interface IPreviewState{
    previewImageSource: string;
    currentNoteNumber: number;
}

export class Preview extends React.Component<IPreviewProps, IPreviewState> {
    constructor(props: Readonly<IPreviewProps>){
        super(props);

        let initPreviewImageSource = "";

        if(this.props.notes.length > 0){
            initPreviewImageSource = "data:" + this.props.notes[0].mimeType + ";base64, " + this.props.notes[0].documentBody;
        }

        this.state = {
            previewImageSource: initPreviewImageSource,
            currentNoteNumber: 0
        }
    }

    arrowClick = (e: React.SyntheticEvent, shift:number) =>{
        e.preventDefault();

        let nextNoteNumber = this.state.currentNoteNumber + shift;

        if (nextNoteNumber === this.props.notes.length) { nextNoteNumber = 0 };
        if (nextNoteNumber < 0) { nextNoteNumber = this.props.notes.length - 1 };
        
        let nextNote = this.props.notes[nextNoteNumber];

        this.setPreview(nextNote);

        this.setState({currentNoteNumber: nextNoteNumber});
    }

    thumbnailClick = (e: React.SyntheticEvent, currentNoteNumber:number) => {
        e.preventDefault();

        let nextNote = this.props.notes[currentNoteNumber];

        this.setPreview(nextNote);

        this.setState({currentNoteNumber: currentNoteNumber});
    }

    setPreview(currentNote: IAttachment){
        let nextPreviewImageSource = "data:" + currentNote.mimeType + ";base64, " + currentNote.documentBody;

        this.setState({previewImageSource: nextPreviewImageSource});
    }


    componentDidUpdate(prevProps:IPreviewProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.notes.length !== prevProps.notes.length) {
          if(this.state.previewImageSource == "" && this.props.notes.length>0){
            let nextPreviewImageSource = "data:" + this.props.notes[0].mimeType + ";base64, " + this.props.notes[0].documentBody;
            this.setState({previewImageSource: nextPreviewImageSource});
          }
        }
      }

    render() {
        let containerContent;

        if (this.props.loading) {
            containerContent = <Spinner size={SpinnerSize.large} label="Loading..." />;
        } else {
            if (this.props.notes.length > 0) {
                containerContent =
                    <React.Fragment>
                        <PreviewWindow source={this.state.previewImageSource} arrowClick={this.arrowClick} />
                        <PreviewGallery notes={this.props.notes} thumbnailClick={this.thumbnailClick} />
                    </React.Fragment>;
            } else {
                containerContent = <h3>No attachments found...</h3>
            }
        }
        return <div className="preview-container">
            {containerContent}
        </div>
    }
}