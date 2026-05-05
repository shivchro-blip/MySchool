import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';

class ChapterDetailScreen extends StatelessWidget {
  final String   classLevel;
  final String   subjectSlug;
  final String   chapterSlug;
  final Chapter? chapter;

  const ChapterDetailScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
    this.chapter,
  });

  @override
  Widget build(BuildContext context) {
    final title = chapter?.title ?? chapterSlug;
    final type  = chapter?.typeLabel ?? '';
    final num   = chapter?.number;

    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(title: Text(title, overflow: TextOverflow.ellipsis)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Chapter info card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color:        Colors.white,
              borderRadius: BorderRadius.circular(16),
              border:       Border.all(color: AppTheme.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (num != null)
                  Text(
                    'Chapter $num',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textMuted,
                      letterSpacing: 0.8,
                    ),
                  ),
                const SizedBox(height: 6),
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.textPrimary,
                  ),
                ),
                if (type.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  _TypeBadge(type: type, icon: chapter?.typeIcon ?? '📄'),
                ],
              ],
            ),
          ),

          const SizedBox(height: 24),

          _ActionCard(
            icon:    Icons.auto_stories_outlined,
            color:   AppTheme.brand,
            title:   'Learn',
            subtitle: 'AI explanation, key points, and exam tips',
            onTap:   () => context.push('/learn/$chapterSlug', extra: chapter),
          ),

          const SizedBox(height: 12),

          _ActionCard(
            icon:    Icons.edit_note,
            color:   AppTheme.maths,
            title:   'Practice',
            subtitle: 'Answer questions and get AI evaluation',
            onTap:   () => context.push('/practice/$chapterSlug'),
          ),

          const SizedBox(height: 12),

          _ActionCard(
            icon:    Icons.chat_bubble_outline,
            color:   AppTheme.science,
            title:   'Ask AI',
            subtitle: 'Ask any question about this chapter',
            onTap:   () => context.push('/learn/$chapterSlug', extra: chapter),
          ),
        ],
      ),
    );
  }
}

class _TypeBadge extends StatelessWidget {
  final String type;
  final String icon;
  const _TypeBadge({required this.type, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color:        AppTheme.brand.withAlpha(20),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(icon, style: const TextStyle(fontSize: 13)),
          const SizedBox(width: 5),
          Text(
            type,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: AppTheme.brand,
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionCard extends StatefulWidget {
  final IconData icon;
  final Color    color;
  final String   title;
  final String   subtitle;
  final VoidCallback onTap;

  const _ActionCard({
    required this.icon,
    required this.color,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  State<_ActionCard> createState() => _ActionCardState();
}

class _ActionCardState extends State<_ActionCard> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown:   (_) => setState(() => _pressed = true),
      onTapUp:     (_) { setState(() => _pressed = false); widget.onTap(); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 100),
        transform: Matrix4.translationValues(0, _pressed ? 1 : 0, 0),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color:        Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: _pressed
                ? widget.color.withAlpha(120)
                : widget.color.withAlpha(50),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color: widget.color.withAlpha(_pressed ? 40 : 15),
              blurRadius: _pressed ? 12 : 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 46, height: 46,
              decoration: BoxDecoration(
                color:        widget.color.withAlpha(22),
                borderRadius: BorderRadius.circular(11),
              ),
              child: Icon(widget.icon, color: widget.color, size: 24),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.title,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: widget.color.withAlpha(230),
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    widget.subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppTheme.textMuted,
                    ),
                  ),
                ],
              ),
            ),
            Icon(Icons.arrow_forward_ios,
                color: widget.color.withAlpha(160), size: 16),
          ],
        ),
      ),
    );
  }
}
