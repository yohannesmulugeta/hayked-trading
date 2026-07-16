import { InquiryForm } from '../components/InquiryForm';
import { PageHero } from '../components/PageHero';
import { assetUrl } from '../lib/content';

export function RequestSamplePage() {
  return (
    <>
      <PageHero eyebrow="Sample request" title="Prepare a qualified coffee sample enquiry." text="Provide enough information for the export team to understand your company, intended volume, destination and coffee requirement." image={assetUrl('/uploads/quality-green-beans.webp')} />
      <section className="section section--soft">
        <div className="container sample-layout">
          <aside className="sample-guide">
            <span className="eyebrow">Before sending</span>
            <h2>Include the information that helps Hayked respond accurately.</h2>
            <ol>
              <li><span>01</span><p><strong>Company and market</strong>Identify your business and destination country.</p></li>
              <li><span>02</span><p><strong>Coffee requirement</strong>Describe origin, process, grade or profile where known.</p></li>
              <li><span>03</span><p><strong>Commercial context</strong>Share approximate volume and shipment timing.</p></li>
            </ol>
          </aside>
          <InquiryForm mode="sample" />
        </div>
      </section>
    </>
  );
}
