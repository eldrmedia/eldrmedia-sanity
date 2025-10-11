import siteSettings from './singletons/siteSettings'
import navigation from './singletons/navigation'
import page from './pages/page'
import about from './pages/about'
import home from './pages/home'
import post from './post'
import project from './project'

import testimonial from './objects/testimonial'
import cta from './objects/cta'
import colorTheme from './objects/colorTheme'
import feature from './objects/feature'
import kpi from './objects/kpi'
import milestone from './objects/milestone'
import snapshotItem from './objects/snapshotItem'
import phase from './objects/phase'
import aboutSplitModule from './objects/aboutSplitModule'
import blockContent from './objects/blockContent'
import seo from './objects/seo'

import heroModule from './modules/heroModule'
import bentoModule from './modules/bentoModule'
import capabilitiesModule from './modules/capabilitiesModule'
import testimonialModule from './modules/testimonialModule'
import blogFeaturedModule from './modules/blogFeaturedModule'
import processModule from './modules/processModule'
import evidenceModule from './modules/evidenceModule'
import solutionModule from './modules/solutionModule'
import impactModule from './modules/impactModule'
import governanceModule from './modules/governanceModule'
import ctaModule from './modules/ctaModule'
import valuesModule from './modules/valuesModule'

export const schemaTypes = [
  siteSettings, navigation, page, home, about, post, project,
  testimonial, cta, colorTheme, feature, kpi, milestone, snapshotItem, phase, aboutSplitModule, blockContent, seo,
  heroModule, bentoModule, capabilitiesModule, testimonialModule, blogFeaturedModule,
  processModule, evidenceModule, solutionModule, impactModule, governanceModule, ctaModule, valuesModule
]
