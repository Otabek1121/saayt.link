// A detail response may apply only to the selection and edit generation that requested it.
export class EditorLoadGuard {
 private selection=0;
 private edits=0;
 begin(){return {selection:++this.selection,edits:this.edits}}
 edited(){this.edits++}
 cancel(){this.selection++}
 canApply(ticket:{selection:number;edits:number},dirty:boolean,saving:boolean){return ticket.selection===this.selection&&ticket.edits===this.edits&&!dirty&&!saving}
}
