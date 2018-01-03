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
import ManagePurchaseItemsComponent from '../components/bank/Marketplace/ManagePurchaseItems.vue'
import MerchantComponent from '../components/bank/Marketplace/Merchant.vue'
import StudentsComponent from '../components/bank/Students.vue'
import AdminPanelComponent from '../components/admin/AdminPanel.vue'
import ManageDailySchedulesComponents from '../components/admin/AdminPanel/ManageDailySchedules.vue'
import ScheduleBuilderComponent from '../components/admin/AdminPanel/ScheduleBuilder.vue'
import StudentsByGradeComponent from '../components/bank/Students/ByGrade.vue'
import PrintMarketplaceComponent from '../components/bank/Marketplace/PrintMarketPlace.vue'
import RecentPurchasesComponent from '../components/bank/Marketplace/RecentPurchases.vue'
import TeacherCompletionPercentagesComponent from '../components/bank/Teachers/CompletionPercentages.vue'
import $ from 'jquery'


Vue.use(Router)

const router = new Router({
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
					name: 'marketplace_manager',
					path:'marketplace/manage/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Manage Marketplace'
					},
					components: {
						content: ManagePurchaseItemsComponent
					}
				},
				{
					name: 'merchant',
					path: 'marketplace/merchant/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Marketplace'
					},
					components: {
						content: MerchantComponent
					}
				},
				{
					name: 'recent_purchases',
					path: 'marketplace/recent_purchases/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Recent Purchases'
					},
					components: {
						content: RecentPurchasesComponent
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
				},
				{
					name: 'students',
					path: 'students/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Students'
					},
					components: {
						content: StudentsComponent
					}
				},
				{
					name: 'admin_panel',
					path: 'admin/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Admin'
					},
					components: {
						content: AdminPanelComponent
					}
				},
				{
					name: 'manage_daily_schedules',
					path: 'admin/daily_schedules/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Daily Schedules'
					},
					components: {
						content: ManageDailySchedulesComponents
					}
				},
				{
					name: 'schedule_builder',
					path: 'admin/schedule_builder/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Schedule Builder'
					},
					components: {
						content: ScheduleBuilderComponent
					}
				},
				{
					name: 'students_by_grade',
					path: 'admin/students/:grade/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Grade List'
					},
					components: {
						content: StudentsByGradeComponent
					}
				},
				{
					name: 'completion_rates_by_teacher',
					path: 'admin/teachers/completion_rates/',
					meta: {
						bodyClass: 'dashboard',
						title: 'Buffalo Bank | Completion Percentages'
					},
					components: {
						content: TeacherCompletionPercentagesComponent
					}
				}
			]
		},
		{
			path: '/marketplace/print/',
			component: PrintMarketplaceComponent,
			name: "print_marketplace",
			meta: {
				title: 'Buffalo Bank | Print Market',
				bodyClass: 'login'
			}
		}
	]
})

router.beforeEach(function(to,from,next) {
	document.title = to.meta.title;
	$('body').removeClass(from.meta.bodyClass).addClass(to.meta.bodyClass);
	next();
})

export default router
