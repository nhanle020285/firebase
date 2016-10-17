import { enableProdMode, ApplicationRef, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideStore } from '@ngrx/store';
import { removeNgStyles, createNewHosts, createInputTransfer, bootloader } from '@angularclass/hmr';
// AppModule
import { AppModule } from './app';
import { AppStore } from './app/app-store';
import { AppComponent } from './app/components/app';

// common styles
import './common/styles.scss';
declare var module:any;

enableProdMode();
@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppModule
  ],
  providers: [
    AppStore
  ]
})
class MainModule {
  constructor(public appRef: ApplicationRef, public appStore: AppStore) {}
  hmrOnInit(store) {
    if (!store || !store.state) { return; }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // restore state
    this.appStore.setState(store.state);
    // restore input values
    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    const currentState = this.appStore.getState();
    store.state = currentState;
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(MainModule);
}
window['__DEV__'] = true;
// boot on document ready
bootloader(main);

//platformBrowserDynamic().bootstrapModule(AppModule);
