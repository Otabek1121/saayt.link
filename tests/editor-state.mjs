import assert from 'node:assert/strict';import {EditorLoadGuard} from '../lib/editor-load-guard.ts';
const guard=new EditorLoadGuard();const first=guard.begin(),second=guard.begin();assert(!guard.canApply(first,false,false),'An older project response must not replace a newer selection');assert(guard.canApply(second,false,false));
const editing=guard.begin();guard.edited();assert(!guard.canApply(editing,false,false),'Edits made during a request survive even after an autosave clears dirty');
const saving=guard.begin();assert(!guard.canApply(saving,false,true),'A response cannot replace a project during a save');assert(!guard.canApply(saving,true,false),'Unsaved edits must survive');
const navigating=guard.begin();guard.cancel();assert(!guard.canApply(navigating,false,false),'Leaving the selection invalidates its pending response');assert(guard.canApply(guard.begin(),false,false));
console.log('PASS: late project responses cannot overwrite newer selections, edits, autosaves, in-flight saves or navigation.');
