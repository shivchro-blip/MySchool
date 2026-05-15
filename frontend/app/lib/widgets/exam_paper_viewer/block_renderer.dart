import 'package:flutter/material.dart';
import '../../models/exam_paper_model.dart';
import 'block_widgets/paper_header_block.dart';
import 'block_widgets/metadata_row_block.dart';
import 'block_widgets/instructions_block.dart';
import 'block_widgets/part_heading_block.dart';
import 'block_widgets/section_heading_block.dart';
import 'block_widgets/paragraph_text_block.dart';
import 'block_widgets/question_block.dart';
import 'block_widgets/mcq_question_block.dart';
import 'block_widgets/multi_subquestion_block.dart';
import 'block_widgets/or_question_block.dart';
import 'block_widgets/table_block.dart';
import 'block_widgets/image_block.dart';
import 'block_widgets/footer_note_block.dart';

class BlockRenderer extends StatelessWidget {
  final ExamBlock block;
  const BlockRenderer({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    switch (block.type) {
      case 'paper_header':      return PaperHeaderBlock(block: block);
      case 'metadata_row':      return MetadataRowBlock(block: block);
      case 'instructions':      return InstructionsBlock(block: block);
      case 'part_heading':      return PartHeadingBlock(block: block);
      case 'section_heading':   return SectionHeadingBlock(block: block);
      case 'paragraph_text':    return ParagraphTextBlock(block: block);
      case 'question':          return QuestionBlock(block: block);
      case 'mcq_question':      return McqQuestionBlock(block: block);
      case 'multi_subquestion': return MultiSubquestionBlock(block: block);
      case 'or_question':       return OrQuestionBlock(block: block);
      case 'table':             return TableBlock(block: block);
      case 'image':
      case 'chart_image':       return ImageBlock(block: block);
      case 'footer_note':       return FooterNoteBlock(block: block);
      default:
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Text(
            '[Unknown block: ${block.type}]',
            style: const TextStyle(fontSize: 9, fontStyle: FontStyle.italic),
          ),
        );
    }
  }
}
