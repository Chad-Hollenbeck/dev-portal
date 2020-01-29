'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">chollenbeck-dev-portal documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' : 'data-target="#xs-components-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' :
                                            'id="xs-components-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' : 'data-target="#xs-injectables-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' :
                                        'id="xs-injectables-links-module-AppModule-e511b24904deb19b958059c6138abf9a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-0d44b9bbb1f0a43da3280cbb179ed529"' : 'data-target="#xs-components-links-module-AuthModule-0d44b9bbb1f0a43da3280cbb179ed529"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-0d44b9bbb1f0a43da3280cbb179ed529"' :
                                            'id="xs-components-links-module-AuthModule-0d44b9bbb1f0a43da3280cbb179ed529"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-fec0797a2210c154927fe53207f330ed"' : 'data-target="#xs-components-links-module-HomeModule-fec0797a2210c154927fe53207f330ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-fec0797a2210c154927fe53207f330ed"' :
                                            'id="xs-components-links-module-HomeModule-fec0797a2210c154927fe53207f330ed"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-39480369d2c96a7f9155ada361eacddf"' : 'data-target="#xs-components-links-module-ProfileModule-39480369d2c96a7f9155ada361eacddf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-39480369d2c96a7f9155ada361eacddf"' :
                                            'id="xs-components-links-module-ProfileModule-39480369d2c96a7f9155ada361eacddf"' }>
                                            <li class="link">
                                                <a href="components/ProfileIndexComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileIndexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsModule.html" data-type="entity-link">ProjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' : 'data-target="#xs-components-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' :
                                            'id="xs-components-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' }>
                                            <li class="link">
                                                <a href="components/ProjectCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' : 'data-target="#xs-injectables-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' :
                                        'id="xs-injectables-links-module-ProjectsModule-9637116a9aa947b4cd3a4cee3cdd9e83"' }>
                                        <li class="link">
                                            <a href="injectables/ProjectService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProjectService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-fa99a1b71c9ebeb1d09376ab5651147b"' : 'data-target="#xs-components-links-module-SharedModule-fa99a1b71c9ebeb1d09376ab5651147b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-fa99a1b71c9ebeb1d09376ab5651147b"' :
                                            'id="xs-components-links-module-SharedModule-fa99a1b71c9ebeb1d09376ab5651147b"' }>
                                            <li class="link">
                                                <a href="components/LoadingSpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingSpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolsModule.html" data-type="entity-link">ToolsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ToolsModule-b0247acd06edf41cc456af20059534ac"' : 'data-target="#xs-components-links-module-ToolsModule-b0247acd06edf41cc456af20059534ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolsModule-b0247acd06edf41cc456af20059534ac"' :
                                            'id="xs-components-links-module-ToolsModule-b0247acd06edf41cc456af20059534ac"' }>
                                            <li class="link">
                                                <a href="components/ClassMapperComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClassMapperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-1260651bef83fdca3b9334af094797a4"' : 'data-target="#xs-components-links-module-UsersModule-1260651bef83fdca3b9334af094797a4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-1260651bef83fdca3b9334af094797a4"' :
                                            'id="xs-components-links-module-UsersModule-1260651bef83fdca3b9334af094797a4"' }>
                                            <li class="link">
                                                <a href="components/UserDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BreadcrumbVM.html" data-type="entity-link">BreadcrumbVM</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassAttributeVM.html" data-type="entity-link">ClassAttributeVM</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassConfigVM.html" data-type="entity-link">ClassConfigVM</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectVM.html" data-type="entity-link">ProjectVM</a>
                            </li>
                            <li class="link">
                                <a href="classes/SlimUserVM.html" data-type="entity-link">SlimUserVM</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPermission.html" data-type="entity-link">UserPermission</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRateVM.html" data-type="entity-link">UserRateVM</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserVM.html" data-type="entity-link">UserVM</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link">ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpinnerService.html" data-type="entity-link">SpinnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRateService.html" data-type="entity-link">UserRateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});