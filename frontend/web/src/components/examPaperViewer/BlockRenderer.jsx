import PaperHeaderBlock      from './blocks/PaperHeaderBlock'
import MetadataRowBlock      from './blocks/MetadataRowBlock'
import InstructionsBlock     from './blocks/InstructionsBlock'
import PartHeadingBlock      from './blocks/PartHeadingBlock'
import SectionHeadingBlock   from './blocks/SectionHeadingBlock'
import ParagraphTextBlock    from './blocks/ParagraphTextBlock'
import QuestionBlock         from './blocks/QuestionBlock'
import McqQuestionBlock      from './blocks/McqQuestionBlock'
import MultiSubquestionBlock from './blocks/MultiSubquestionBlock'
import OrQuestionBlock       from './blocks/OrQuestionBlock'
import TableBlock            from './blocks/TableBlock'
import ImageBlock            from './blocks/ImageBlock'
import FooterNoteBlock       from './blocks/FooterNoteBlock'
import NoticeBoxBlock        from './blocks/NoticeBoxBlock'

export default function BlockRenderer({ block }) {
  switch (block.type) {
    case 'paper_header':       return <PaperHeaderBlock      block={block} />
    case 'metadata_row':       return <MetadataRowBlock      block={block} />
    case 'instructions':       return <InstructionsBlock     block={block} />
    case 'part_heading':       return <PartHeadingBlock      block={block} />
    case 'section_heading':    return <SectionHeadingBlock   block={block} />
    case 'paragraph_text':     return <ParagraphTextBlock    block={block} />
    case 'question':           return <QuestionBlock         block={block} />
    case 'mcq_question':       return <McqQuestionBlock      block={block} />
    case 'multi_subquestion':  return <MultiSubquestionBlock block={block} />
    case 'or_question':        return <OrQuestionBlock       block={block} />
    case 'table':              return <TableBlock            block={block} />
    case 'image':
    case 'chart_image':        return <ImageBlock            block={block} />
    case 'notice_box':         return <NoticeBoxBlock        block={block} />
    case 'footer_note':        return <FooterNoteBlock       block={block} />
    default:
      return (
        <p className="text-[10px] text-ink-4 italic my-1">[Unknown block: {block.type}]</p>
      )
  }
}
