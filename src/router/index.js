import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/registration/Login.vue'
import RegistrationLayout from '../components/registration/RegistrationLayout.vue'
import DashboardLayout from '../components/bank/DashboardLayout.vue'
import Dashboard from '../components/bank/Dashboard.vue'
import ReportsPageComponent from '../components/bank/Reports.vue'
import CoursesPageComponent from '../components/bank/Courses.vue'
import RosterPageComponent from '../components/bank/CourseRoster.vue'
import CourseReportComponent from '../components/bank/CourseReport.vue'
import StudentProfileComponent from '../components/bank/StudentProfile.vue'
import MarketPlaceComponent from '../components/bank/Marketplace.vue'
import $ from 'jquery'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: RegistrationLayout,
      children: [
        {
          name: 'login',
          path: 'login/',
          meta: {
            bodyClass: 'login',
            title: 'Buffalo Bank | Login'
          },
          components: {
            content: Login
          }
        }
      ]
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          name: 'dashboard',
          path: 'home/',
          meta: {
            bodyClass: 'dashboard',
            title: 'Buffalo Bank | Dashboard',
          },
          components: {
            content: Dashboard
          }
        },
        {
          name: 'reports_list',
          path: 'reports/',
          meta: {
            bodyClass: 'dashboard',
            title: 'Buffalo Bank | Reports',
          },
          components: {
            content: ReportsPageComponent
          }
        },
        {
          name: 'courses_list',
          path: 'courses/',
          meta: {
            bodyClass: 'dashboard',
            title: 'Buffalo Bank | Courses',
          },
          components: {
            content: CoursesPageComponent
          }
        },
        {
          name: 'course_roster',
          path: 'courses/:course_id/',
          meta: {
            bodyClass: 'dashboard',
            title: 'Buffalo Bank | Roster'
          },
          components: {
            content: RosterPageComponent
          }
        },
        {
          name: 'course_report',
          path: 'reports/:report_id/',
          meta: {
            bodyClass: 'dashboard',
            title: 'Buffalo Bank | Report'
          },
          components: {
            content: CourseReportComponent
          }
        },
		 {
		  name: 'marketplace',
		  path:'marketplace',
		  meta: {
		  bodyClass: 'dashboard',
		  title: 'Buffalo Bank | Marketplace'
		  },
		  components: {
		  	content: MarketPlaceComponent
		  }
		 },
		{
			name: 'student_profile',
			path: 'students/:student_id/',
			meta: {
				bodyClass: 'dashboard',
				title: 'Buffalo Bank | Student'
			},
			components: {
				content: StudentProfileComponent
			}
		}
      ]
    }
  ]
})

router.beforeEach(function(to,from,next) {
	document.title = to.meta.title;
	$('body').removeClass(from.meta.bodyClass).addClass(to.meta.bodyClass);
	next();
})

export default router