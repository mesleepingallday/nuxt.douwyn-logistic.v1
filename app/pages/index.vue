<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <!-- Hero Section with White Paper -->
    <section class="relative h-screen flex items-center bg-amber-700 dark:bg-amber-900 text-white overflow-hidden">
      <div class="absolute inset-0 z-0">
        <NuxtImg
          src="/images/Desktop-WP-Omnicanal-LP-5.webp"
          alt="Person using mobile device"
          class="w-full h-full object-cover opacity-60"
          format="webp"
          placeholder
        />
      </div>
      <div class="container mx-auto px-4 md:px-8 z-10 relative">
        <div class="inline-block bg-green-500 dark:bg-green-600 text-white text-sm px-3 py-1 mb-4 rounded">
          WHITE PAPER
        </div>
        <h1 class="text-3xl md:text-5xl font-bold mb-4 max-w-xl">
          Omnichannel Supply Chain: our white paper
        </h1>
        <p class="text-lg mb-8 max-w-xl">
          Consumer behaviours are defining a seamless shopping experience
        </p>
        <button
          class="border-2 border-white rounded-full px-6 py-3 text-white hover:bg-white hover:text-amber-700 dark:hover:text-amber-900 transition-colors font-medium"
          aria-label="Download white paper"
          tabindex="0"
          @click="handleDownloadWhitePaper"
          @keydown.enter="handleDownloadWhitePaper"
        >
          DOWNLOAD OUR WHITE PAPER
        </button>
      </div>
    </section>

    <!-- Logistics Services Grid -->
    <section class="bg-white dark:bg-gray-900 py-8">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
        <div class="p-6 flex flex-col items-start">
          <h3 class="text-sm font-bold mb-2 text-gray-900 dark:text-gray-100">
            Key data about shipping transport's future
          </h3>
          <a
            href="#"
            class="text-green-500 dark:text-green-400 text-sm font-medium mt-auto hover:underline"
            aria-label="Learn more about shipping transport's future"
            tabindex="0"
            @click="handleLearnMore"
            @keydown.enter="handleLearnMore"
          >
            Learn more
          </a>
        </div>
        <div class="p-6 flex flex-col items-start">
          <h3 class="text-sm font-bold mb-2 text-gray-900 dark:text-gray-100">
            Industrial Logistics: Challenges and Opportunities
          </h3>
          <a
            href="#"
            class="text-green-500 dark:text-green-400 text-sm font-medium mt-auto hover:underline"
            aria-label="Learn more about industrial logistics"
            tabindex="0"
            @click="handleLearnMore"
            @keydown.enter="handleLearnMore"
          >
            Learn more
          </a>
        </div>
        <div class="p-6 flex flex-col items-start">
          <h3 class="text-sm font-bold mb-2 text-gray-900 dark:text-gray-100">
            Consumer Logistics: elevating the experience
          </h3>
          <a
            href="#"
            class="text-green-500 dark:text-green-400 text-sm font-medium mt-auto hover:underline"
            aria-label="Learn more about consumer logistics"
            tabindex="0"
            @click="handleLearnMore"
            @keydown.enter="handleLearnMore"
          >
            Learn more
          </a>
        </div>
        <div class="p-6 flex flex-col items-start">
          <h3 class="text-sm font-bold mb-2 text-gray-900 dark:text-gray-100">
            Discover our Carbon Calculator
          </h3>
          <a
            href="#"
            class="text-green-500 dark:text-green-400 text-sm font-medium mt-auto hover:underline"
            aria-label="Learn more about carbon calculator"
            tabindex="0"
            @click="handleLearnMore"
            @keydown.enter="handleLearnMore"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>

    <!-- Publications Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 md:px-8">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 mb-12">
          Read our latest publications
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Blog Posts -->
          <BlogPost
            v-for="post in latestPosts"
            :key="post.id"
            :post="post"
          />

          <!-- Placeholder cards shown when no posts available -->
          <div
            v-for="index in 3"
            v-if="!latestPosts.length"
            :key="`placeholder-${index}`"
            class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
          >
            <div class="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
        </div>

        <div class="flex justify-center mt-12">
          <NuxtLink to="/blogs">
            <UButton
              class="bg-white border border-green-500 dark:border-green-400 rounded-full px-6 py-3 text-green-500 dark:text-green-400 hover:cursor-pointer hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-colors font-medium"
            >
              SEE ALL OUR PUBLICATIONS
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Activities/Solutions Section -->
    <section class="bg-gray-700 dark:bg-gray-800 py-16 relative overflow-hidden">
      <div class="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex flex-col space-y-6">
          <div class="flex items-center space-x-3 text-lg">
            <div class="text-green-500 dark:text-green-400">
              <UIcon
                name="i-heroicons-play"
                class="w-5 h-5"
              />
            </div>
            <h3 class="text-white font-bold">
              Your activities
            </h3>
          </div>
          <div class="flex items-center space-x-3 text-lg">
            <div class="text-green-500 dark:text-green-400">
              <UIcon
                name="i-heroicons-play"
                class="w-5 h-5"
              />
            </div>
            <h3 class="text-white font-bold">
              Our solutions
            </h3>
          </div>
          <div class="flex items-center space-x-3 text-lg">
            <div class="text-green-500 dark:text-green-400">
              <UIcon
                name="i-heroicons-play"
                class="w-5 h-5"
              />
            </div>
            <h3 class="text-white font-bold">
              Our people
            </h3>
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <p class="text-white mb-6">
            No matter which activity you are in, we have the logistics solutions you need to optimize your supply chain.
          </p>
          <button
            class="bg-white dark:bg-gray-100 rounded-full px-6 py-3 text-gray-700 dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-white transition-colors font-medium self-start"
            aria-label="Discover our activities"
            tabindex="0"
            @click="handleDiscoverActivities"
            @keydown.enter="handleDiscoverActivities"
          >
            DISCOVER OUR ACTIVITIES
          </button>
        </div>
      </div>

      <!-- Background corner decorations -->
      <div class="absolute right-0 bottom-0">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M0 200 L200 200 L200 0 Z"
            fill="#22c55e"
          />
        </svg>
      </div>
    </section>

    <!-- Careers Section -->
    <UPageCTA
      description="Joining FM Logistic means joining a company where we believe that everyone can be a driving force in making supply chains more sustainable and building better tomorrows."
      orientation="horizontal"
      :links="linksCareers"
    >
      <NuxtImg
        src="/images/career-home.webp"
        width="260"
        height="182"
        alt="webp"
        class="absolute object-cover object-center right-1/4"
      />
    </UPageCTA>

    <!-- About FM Logistic -->
    <UPageCTA
      class="bg-[url(/images/ABOUT_ILLUSTRATION.svg)] bg-cover bg-no-repeat py-20"
      title="About Douwyn Logistic"
      description="At Douwyn Logistic, we are 27,000 people who believe that supply chains have the power to create positive impacts for people and the planet."
      variant="soft"
      :links="linksAboutUsCTA"
    />

    <!-- Global Presence -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 md:px-8">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 mb-6 text-center md:text-left">
          FM Logistic in the world
        </h2>
        <p class="text-gray-700 dark:text-gray-300 mb-8 text-center md:text-left">
          Fully independent, we activate our belief across 3 continents.
        </p>
        <button
          class="border border-green-500 dark:border-green-400 rounded-full px-6 py-3 text-green-500 dark:text-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-colors font-medium mx-auto md:mx-0 block md:inline-block"
          aria-label="Contact us"
          tabindex="0"
          @click="handleContact"
          @keydown.enter="handleContact"
        >
          CONTACT US
        </button>

        <div class="mt-12">
          <NuxtImg
            src="/images/global-map.webp"
            alt="FM Logistic global presence map"
            class="w-full dark:opacity-90"
            format="webp"
            placeholder
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/Post'

const { find } = useStrapi()

// Event handlers
const handleDownloadWhitePaper = () => {
  console.log('Download white paper clicked')
}

const handleLearnMore = () => {
  console.log('Learn more clicked')
}

const handleSeeAllPublications = () => {
  console.log('See all publications clicked')
}

const handleDiscoverActivities = () => {
  console.log('Discover activities clicked')
}

const handleSeeJobOffers = () => {
  console.log('See job offers clicked')
}

const handleLearnMoreAbout = () => {
  console.log('Learn more about FM Logistic clicked')
}

const handleContact = () => {
  console.log('Contact us clicked')
}

const linksCareers = ref([
  {
    label: 'SEE OUR JOB OFFERS',
    to: '/careers'
  }
])

const linksAboutUsCTA = ref([
  {
    label: 'LEARN MORE ABOUT US',
    to: '/about-us',
    color: 'neutral'
  }
])

const { data } = await useAsyncData<{ data: Post[] }>(
  'home-latest-posts',
  () => find('posts', {
    sort: 'publishedAt:desc',
    pagination: {
      page: 1,
      pageSize: 3
    },
    populate: {
      featured_image: {
        fields: ['url', 'name']
      },
      category: {
        fields: ['name', 'slug']
      },
      author: {
        fields: ['name', 'email']
      }
    }
  })
)

const latestPosts = computed<Post[]>(() => data.value?.data || [])
</script>
