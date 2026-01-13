import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./ModalOurTeam.module.css";
import ModalOurTeamCard from "../ModalOurTeamCard/ModalOurTeamCard";

export default function TeamModal({ isOpen, onClose }) {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className={styles.overlay}>
        <div className={styles.backdrop} onClick={onClose} />

        <div className={styles.modal}>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>

          <header className="px-6 pt-10 pb-4 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Meet the Creators
            </h2>
            <p className="mt-3 text-[#92adc9]">
              Passionate travelers and tech enthusiasts
            </p>
          </header>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModalOurTeamCard
              name="Alex Johnson"
              role="High-altitude trekking expert"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDQcmIZ9nKoudlflP6VXv_h5Y0_UufmZmhAsy8b8Z82uKUaMl7ZQ1kIY_8Cievmub7ELx_FQGwJWfCR5I4umCCW-66n5Ny91KEjAkqJe23kUNwHdg0KGrweUPIEgO4DR34TJbck8zm_KD7u2edgnnQLLcv1L5uGYaf9kgVpr0NXFqU3hIgirBKm45YipB5KQdtXbe_olFdrJeBxOcXDFaG_sGf9hGerELwlm6K6IOghUfDQakFwGgov4ycec-alEBHNE8gb3Y4NDDNC"
            />
            <ModalOurTeamCard
              name="Maria Garcia"
              role="Local stays curator"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuBldfFlscYsNi_l5zof0Iwe3K3aVI2_2j8aRcCGEnNRXyOfq7VFB12SQbfciXO9p2KZt4_ALYUkgckXMJe2Ch_dpTU75rFAoLA4RnMoL3XwtKEVR3p9jeno0oBUZbT_zH-6QXGStEym_Mzv5DMq4iXA4Nr8Am0grEohMSo-ejBLrTd4fxqD1Koa1YNg_gSpLIHSpGaJmNVGSZzc88oN72Ivl-vfexyEEY7Fw18It9wNsaqboRWUUirxJ0oBBFoTGmAbbxbFrmG9toG1"
            />
            <ModalOurTeamCard
              name="Liam Smith"
              role="Frontend & UX engineer"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDovCdGEcRUHsStpF43AlVlA98WRF2Kw_R-LhvRq-qCHsyu0433O65ojGIXMht8MBA6t2K5GkuyCxcynJTUfvkk5O2aMOB0EgnPob4dRo4iIaiwxzEcDylZgRp_pgkmliKWnIozIw1ifY9yjBOMITkLMwdsGTp8U8dF-hrNdNYOOavqlmtzHm5qLpDduoKhZJH1StPhDORdJAhE7ojhWfY7JSH4AORuhzuD8odfJL2xgwejyWQHSRrWJWRGX7bmaKjj2i75jRS5wbmA"
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
