import Head from 'next/head';

interface PageProps {
    children: React.ReactNode
    title?: string
    description?:string
}

 

export default function Page({ children , title , description}: PageProps) {
  return (
      <>
          <Head>
              <title>{title || "Member Directory | Forefront" }</title>
              <meta name="description" content={description || "Find, connect, and plan projects with community members"} />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={title || "Member Directory | Forefront" }/>
              <meta property="og:description" content={description || "Find, connect, and plan projects with community members"} />
              <meta property="og:image" content="https://forefront.market/static/creators/forefront.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@forefront__" />
              <meta name="twitter:title" content={title || "Member Directory | Forefront"} />
              <meta name="twitter:description" content={description || "Find, connect, and plan projects with community members"} />
              <meta name="twitter:image" content="https://forefront.market/static/creators/forefront.png" />
          </Head>
    
      {children}
    </>
  )
}
